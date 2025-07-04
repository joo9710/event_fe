import "../App.css";

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { event_id } = useParams(); // URL 파라미터에서 event_id 추출
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //axios.get(`http://52.78.114.84:8000/events/${event_id}`)
    axios.get(`http://13.124.75.129:8000/events/${event_id}`)
    // axios.get(`https://q746disre0.execute-api.ap-northeast-2.amazonaws.com/prod/events/${event_id}`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('이벤트 정보를 불러오는 데 실패했습니다.');
        setLoading(false);
      });
  }, [event_id]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>이벤트 정보가 없습니다.</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      {event.image && <img src={`http://13.124.75.129:8000/events/download/${event.id}`} alt={event.title} style={{ width: '300px' }} />}
      {/* {event.image && <img src={`http://43.203.230.234:8000/events/download/${event.id}`} alt={event.title} style={{ width: '300px' }} />} */}
      <p><strong>설명:</strong> {event.description}</p>
      <p><strong>위치:</strong> {event.location}</p>
      <p><strong>태그:</strong> {event.tags}</p>
      <p><strong>이벤트 ID:</strong> {event.id}</p>
    </div>
  );
};

export default Detail;
