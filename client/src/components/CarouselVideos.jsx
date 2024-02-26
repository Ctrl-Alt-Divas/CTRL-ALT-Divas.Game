import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

function CarouselVideos() {
  return (
    <div className="carousel-container">
      <Carousel slide={false}>
        <Carousel.Item>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/watch?v=eyu9604Envk"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            origin="true"
          ></iframe>
        </Carousel.Item>
        <Carousel.Item>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/-39kuBXyKWo?si=iYu8VS7y0dRFmu5A"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            origin="true"
          ></iframe>
        </Carousel.Item>
        <Carousel.Item>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/pu76c3HCKg4?si=cvuuG1Pmb47tLr8K"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            origin="true"
          ></iframe>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselVideos;
