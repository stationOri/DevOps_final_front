import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../css/components/Modal/EmptyEnrollModal.css";
import closeIcon from "../../assets/images/modal/x-close.png";
import emptyIcon from "../../assets/images/modal/emptyenroll.png";
import restIcon from "../../assets/images/modal/rest.png";
import SuccessModal from "./SuccessModal";
import { useSuccessModal } from "./SuccessModalContext";

const WaitingEnrollModal = ({ isOpen, onClose, name }) => {
  const { id } = useParams();
  const [restInfo, setRestInfo] = useState(null);
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [maxPpl, setMaxPpl] = useState(0);
  const { openSuccessModal } = useSuccessModal();

  useEffect(() => {
    if (isOpen) {
      fetchRestInfo();
    }
  }, [isOpen]);

  const fetchRestInfo = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restInfo`);
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant info");
      }
      const data = await response.json();
      setRestInfo(data);
      if (data && data.length > 0) {
        setMaxPpl(data[0].max_ppl);
      }
    } catch (error) {
      console.error(error);
    }
  };


};