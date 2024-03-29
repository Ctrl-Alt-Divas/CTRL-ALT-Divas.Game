import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

function CarouselVideos() {
  return (
    <div>
      <Carousel className="carousel" slide={false} data-pause="mouseenter">
        <Carousel.Item>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              width="560"
              height="315"
              src="https://youtube.com/embed/eyu9604Envk?si=otuascUOyvUX1gr1&mute=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              origin="true"
            ></iframe>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              width="560"
              height="315"
              src="https://youtube.com/embed/k-mOyjjWTfc?si=SK_0VzRjTcMHPmVa&mute=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              origin="true"
            ></iframe>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              width="560"
              height="315"
              src="https://youtube.com/embed/vtcDrXM-ChQ?si=tT2vREy7B_WXYbGg&mute=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              origin="true"
            ></iframe>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              width="560"
              height="315"
              src="https://youtube.com/embed/OmwCdyokZ5k?si=Juwovxb2TYrVFhyH&mute=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              origin="true"
            ></iframe>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselVideos;
