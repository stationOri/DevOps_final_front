import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import markerIcon from "../assets/images/marker.png";

const ArrayRestaurantsMap = ({ addresses }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // 지도 객체를 저장할 useRef

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current || !addresses || addresses.length === 0) return;

      // 이미 지도 객체가 있으면 기존 객체를 사용하고, 없으면 새로 생성
      if (!mapInstance.current) {
        const defaultLatLng = [37.339832, 127.108985];
        const defaultZoom = 12;

        const map = L.map(mapRef.current).setView(defaultLatLng, defaultZoom);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "stationOri : Waitmate",
          maxZoom: 18,
        }).addTo(map);

        mapInstance.current = map; // useRef에 지도 객체 저장
      }

      const customIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [32, 42],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const addMarkers = async () => {
        for (let address of addresses) {
          const latlng = await getLatLngFromAddress(address);
          if (latlng) {
            L.marker(latlng, { icon: customIcon }).addTo(mapInstance.current).bindPopup(address);
          }
        }
      };

      const getLatLngFromAddress = async (address) => {
        const apiUrl = "/api/req/address";
        const params = {
          service: "address",
          request: "getcoord",
          version: "2.0",
          crs: "epsg:4326",
          address: address,
          type: "ROAD",
          key: process.env.REACT_APP_VWORLD_API_KEY,
        };

        try {
          const response = await axios.get(apiUrl, { params: params });
          const { result } = response.data.response;

          const { x, y } = result.point;
          return L.latLng(parseFloat(y), parseFloat(x));
        } catch (error) {
          console.error("API 호출 오류:", error);
          return null;
        }
      };

      addMarkers();

      return () => {
        // 컴포넌트 언마운트 시 지도 객체 제거
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    };

    initializeMap();
  }, [addresses]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginTop: "20px",
      }}
    ></div>
  );
};

export default ArrayRestaurantsMap;
