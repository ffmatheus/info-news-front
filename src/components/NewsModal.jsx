import React, { useEffect, useState } from "react";

const NewsModal = ({ active, handleModal, token, id, setErrorMessage }) => {
  const [tittle, setTittle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const getNews = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`http://localhost:8000/news/${id}`, requestOptions);

      if (!response.ok) {
        setErrorMessage("Noticias nao encontradas!");
      } else {
        const data = await response.json();
        setTittle(data.tittle);
        setContent(data.content);
      }
    };

    if (id) {
      getNews();
    }
  }, [id, token]);

  const cleanFormData = () => {
    setTittle("");
    setContent("");
  };

  const handleCreateNews = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        tittle: tittle,
        content: content,
      }),
    };
    const response = await fetch("http://localhost:8000/news", requestOptions);
    if (!response.ok) {
      setErrorMessage("Erro ao criar noticia");
    } else {
      cleanFormData();
      handleModal();
    }
  };

  const handleUpdateNews = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        tittle: tittle,
        content: content,
      }),
    };
    const response = await fetch(`http://localhost:8000/news/${id}`, requestOptions);
    if (!response.ok) {
      setErrorMessage("Erro ao atualizar noticia");
    } else {
      cleanFormData();
      handleModal();
    }
  };

  return (
    <div className={`modal ${active && "is-active"}`}>
      <div className="modal-background" onClick={handleModal}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary-light">
          <h1 className="modal-card-title">
            {id ? "Atualizar Noticia" : "Criar Noticia"}
          </h1>
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <label className="label">Titulo</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Titulo"
                  value={tittle}
                  onChange={(e) => setTittle(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Conteudo</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="Conteudo"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot has-background-primary-light">
          {id ? (
            <button className="button is-info" onClick={handleUpdateNews}>
              Atualizar
            </button>
          ) : (
            <button className="button is-primary" onClick={handleCreateNews}>
              Criar
            </button>
          )}
          <button className="button" onClick={handleModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NewsModal;