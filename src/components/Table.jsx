import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

import ErrorMessage from "./ErrorMessage";
import NewsModal from "./NewsModal";
import { UserContext } from "../context/UserContext";

const Table = () => {
  const [token] = useContext(UserContext);
  const [news, setNews] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [id, setId] = useState(null);

  const handleUpdate = async (id) => {
    setId(id);
    setActiveModal(true);
  };

  const handleDelete = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`http://localhost:8000/news/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Erro ao deletar noticia");
    }

    getNews();
  };

  const getNews = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch("http://localhost:8000/news", requestOptions);
    if (!response.ok) {
      setErrorMessage("Erro ao carregar noticias");
    } else {
      const data = await response.json();
      setNews(data.data);
      setLoaded(true);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const handleModal = () => {
    setActiveModal(!activeModal);
    getNews();
    setId(null);
  };

  return (
    <>
      <NewsModal
        active={activeModal}
        handleModal={handleModal}
        token={token}
        id={id}
        setErrorMessage={setErrorMessage}
      />
      <button
        className="button is-fullwidth mb-5 is-primary"
        onClick={() => setActiveModal(true)}
      >
        Criar noticia
      </button>
      <ErrorMessage message={errorMessage} />
      {loaded && news ? (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Conteudo</th>
              <th>Data de criacao</th>
            </tr>
          </thead>
          <tbody>
            {news.map((news) => (
              <tr key={news.id}>
                <td>{news.tittle}</td>
                <td>{news.content}</td>
                <td>{moment(news.date_insert).format("DD/MM/YY HH:mm:ss")}</td>
                <td>
                  <button
                    className="button mr-2 is-info is-light"
                    onClick={() => handleUpdate(news._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="button mr-2 is-danger is-light"
                    onClick={() => handleDelete(news._id)}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Carregando</p>
      )}
    </>
  );
};

export default Table;