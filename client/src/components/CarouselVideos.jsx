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
            src="https://youtube.com/embed/eyu9604Envk?si=otuascUOyvUX1gr1"
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
            src="https://youtube.com/embed/k-mOyjjWTfc?si=SK_0VzRjTcMHPmVa"
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
            src="https://youtube.com/embed/vtcDrXM-ChQ?si=tT2vREy7B_WXYbGg"
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
            src="https://youtube.com/embed/OmwCdyokZ5k?si=Juwovxb2TYrVFhyH"
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
