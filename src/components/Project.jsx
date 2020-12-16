import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import Modal from "./lib/Modal";

const projectsList = [
  {
    id: 1,
    name: "Movie Reservation App",
    description:
      "영화 소개와 예매를 동시에 이룰 수 있는 프로젝트입니다. React의 함수형 컴포넌트를 사용했으며, 컴포넌트의 Lifecycle을 명시적으로 알 수 있는 메서드를 활용하며 동작원리를 익히기 위한 목적이 컸습니다.  Nodejs + MongoDB를 활용한 백엔드와 RestAPI를 활용한 데이터 저장과 조회를 구현한 프로젝트입니다.",
    link: "https://github.com/jinwoo6531/nomfilx",
    techs: ["React", "Node.js", "MongoDB", "Antd","Material-UI"],
    thumnail: "/img/dal/landing.png",
    imgs: [
      "/img/dal/ranking.png",
      "/img/dal/normal.png",
      "/img/dal/story.png",
      "/img/dal/detail.png",
    ],
  },
  {
    id: 2,
    name: "KanbanBoard",
    description:
      "Trello에서 제공하는 기술을 보고 Redux와 드래그 기능을 활용한 개인 프로젝트입니다. State관리를 주 목적으로 공부한 프로젝트입니다.",
    techs: ["React", "Styled-Components"],
    link: "https://jinwoo6531.github.io/KanbanBoard/",
    thumnail: "/img/netflix/main.png",
    imgs: [
      "/img/netflix/main.png",
      "/img/netflix/1.png",
      "/img/netflix/2.png",
      "/img/netflix/3.png",
    ],
  },
  {
    id: 3,
    name: "Movie_Searh",
    description:
      "React에 Typescript를 사용하는것이 주 목적인 개인 프로젝트입니다. React Hooks의 useReducer를 활용한 state 관리를 사용 하였습니다.",
    techs: ["React", "Typescript"],
    link: "https://jinwoo6531.github.io/typescript_movie_search/",
    thumnail: "/img/blog/main.png",
    imgs: [
      "/img/blog/main.png",
      "/img/blog/1.png",
      "/img/blog/2.png",
      "/img/blog/3.png",
    ],
  },
  {
    id: 4,
    name: "StoryBook_Grid",
    description: "'Storybook Framework에 직접 만든 Grid 컴포넌트를 적용한 개인 프로젝트입니다.",
    techs: ["React","Typescript","Storybook"],
    link: "https://sad-meninsky-70188d.netlify.app",
    thumnail: "",
    imgs: ["", "", "", ""],
  },
];

const ProjectWrapper = styled.section`
  padding: 60px;
  background: #1b242f;
  height: 100vh;
  h1 {
    position: relative;
    margin: 15px 0 50px;
    text-align: center;
    font-size: 3rem;
    color: #fff;
    &::before {
      content: "";
      width: 150px;
      height: 5px;
      background: #fff;
      position: absolute;
      left: 50%;
      bottom: -10px;
      transform: translateX(-50%);
    }
  }
  .project__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .project__gridWrapper {
    width: 800px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .project__gridItem {
      position: relative;
      width: 390px;
      height: 300px;
      overflow: hidden;

      &:hover {
        .gridItem__img {
          opacity: 0;
        }
        .gridItem__text {
          top: 30px;
          opacity: 1;
        }
        .gridItem__btn {
          bottom: 30px;
          opacity: 1;
        }
      }
      .gridItem__img {
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        transition: opacity 0.3s;
      }
      .gridItem__text {
        position: absolute;
        top: -30px;
        left: 50%;
        width: 100%;
        text-align: center;
        opacity: 0;
        transform: translateX(-50%);
        transition: all 0.3s;
        h3 {
          font-size: 1.5rem;
          color: #fff;
        }
        span {
          display: block;
          color: #e31b6d;
        }
      }
      .gridItem__btn {
        position: absolute;
        bottom: -30px;
        left: 50%;
        padding: 3px 10px;
        transform: translateX(-50%);
        transition: all 0.3s;
        background: #1b242f;
        border: 2px solid #fff;
        color: #fff;
        outline: none;
        font-size: 1.2rem;
        opacity: 0;
        &:hover {
          background: #e31b6d;
          border: 2px solid #e31b6d;
          color: #fff;
        }
      }
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1099px) {
    height: auto;
    padding: 30px;
    h1 {
      font-size: 2.5rem;
    }
    h1::before {
      width: 100px;
    }
    .project__gridWrapper .project__gridItem {
      width: 339px;
    }
  }
  @media screen and (min-width: 360px) and (max-width: 767px) {
    height: auto;
    padding: 0;
    h1 {
      font-size: 2.5rem;
      margin: 0px 0 30px;
      padding: 30px 0 0;
    }
    h1::before {
      width: 100px;
    }
    .project__gridWrapper {
      overflow: hidden;
    }
    .project__gridWrapper .project__gridItem {
      margin: 0 0 15px;
    }
  }
`;

function Project({setOffset}) {
  const project = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [projectIndex, setProjectIndex] = useState(null);

  useEffect(() => {
    setOffset((prevOffset) => ({
      ...prevOffset,
      project: project.current.offsetTop,
    }));
  }, [setOffset]);

  const handleOnClick = (e) => {
    setShowModal(true);
    setProjectIndex(e.target.dataset.id - 1);
  };

  return (
    <ProjectWrapper className="project" ref={project}>
      <h1>PROJECT</h1>
      <div className="project__container container">
        <div className="project__gridWrapper">
          {projectsList.map((project) => (
            <div className="project__key" key={project.id}>
              <div className="project__gridItem">
                <div
                  className="gridItem__img"
                  style={{
                    backgroundImage: `url(${project.thumnail})`,
                  }}
                ></div>
                <div className="gridItem__text">
                  <h3>{project.name}</h3>
                  <span>{project.techs.join(", ")}</span>
                </div>
                <button
                  data-id={project.id}
                  className="gridItem__btn"
                  onClick={handleOnClick}
                >
                  View
                </button>
              </div>
            </div>
          ))}
          {showModal && (
            <Modal
              project={projectsList[projectIndex]}
              setShowModal={setShowModal}
            />
          )}
        </div>
      </div>
    </ProjectWrapper>
  );
}

export default Project;
