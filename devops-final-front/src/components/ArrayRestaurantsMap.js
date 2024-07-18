import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import markerIcon from "../assets/images/marker.png";

const ArrayRestaurantsMap = ({ restaurants, onMarkerClick }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current || !restaurants || restaurants.length === 0) return;

      if (!mapInstance.current) {
        const defaultLatLng = [37.339832, 127.108985];
        const defaultZoom = 12;

        const map = L.map(mapRef.current).setView(defaultLatLng, defaultZoom);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "stationOri : Waitmate",
          maxZoom: 18,
        }).addTo(map);

        mapInstance.current = map;
      }

      const customIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [32, 42],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

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

          if (result && result.point) {
            const { x, y } = result.point;
            return L.latLng(parseFloat(y), parseFloat(x));
          } else {
            console.error(`주소에서 좌표를 가져오는 중 오류: ${JSON.stringify(result)}`);
            return null;
          }
        } catch (error) {
          console.error(`API 호출 오류 (${address}):`, error);
          return null;
        }
      };

      const addMarkers = async () => {
        const markerPromises = restaurants.map(async (restaurant) => {
          const latlng = await getLatLngFromAddress(restaurant.rest_address);
          if (latlng) {
            const marker = L.marker(latlng, { icon: customIcon })
              .addTo(mapInstance.current)
              .bindPopup(restaurant.rest_name);

            marker.on("click", () => {
              if (markerRef.current) {
                markerRef.current.closePopup();
              }
              marker.openPopup();
              
              mapRef.current.style.width = "50%";
              // 클릭 시 마커 위치로 지도 이동
              mapInstance.current.setView(marker.getLatLng());
              
              // 클릭한 마커 참조 저장
              markerRef.current = marker;
              onMarkerClick(restaurant);
            });

            marker.on("popupclose", () => {
              // 팝업이 닫힐 때 다시 기본 너비로 변경
              mapRef.current.style.width = "100%";
              markerRef.current = null;

              onMarkerClick(null);
            });
          }
        });

        await Promise.all(markerPromises);

        if (restaurants.length > 0) {
          const bounds = await calculateBounds(restaurants);
          if (bounds.isValid()) {
            mapInstance.current.fitBounds(bounds);
          } else {
            console.warn("유효하지 않은 경계 값:", bounds);
          }
        }
      };

      const calculateBounds = async (restaurants) => {
        const bounds = new L.LatLngBounds();
        const latlngPromises = restaurants.map((restaurant) =>
          getLatLngFromAddress(restaurant.rest_address)
        );
        const latlngs = await Promise.all(latlngPromises);

        latlngs.forEach((latlng) => {
          if (latlng) {
            bounds.extend(latlng);
          }
        });

        return bounds;
      };

      addMarkers();

      return () => {
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    };

    initializeMap();
  }, [restaurants, onMarkerClick]);

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
