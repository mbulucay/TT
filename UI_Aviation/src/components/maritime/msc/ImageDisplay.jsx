import { useEffect, useState } from "react";
import { MscService } from "../../../api/services/maritime/msc/MscService";
import { useSelector } from "react-redux";
import { FaSearchPlus } from "react-icons/fa";
import { Image } from "primereact/image";

function ImageDisplay( props ) {
  const [imageUrl, setImageUrl] = useState(null);
  const { access_token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await MscService.getMscImage(access_token, props.image_url);
        const blob = new Blob([response.data], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();

    // Clean up the object URL when component unmounts
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []); // Fetch image when access_token changes

  return (
    <div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          indicatorIcon={
            <FaSearchPlus
              fontSize={30}
              color="white"
              className="hover:blur-0 drop-shadow"
            />
          }
          alt="Image"
          preview
          closeOnEscape={false}
          width="500"
          className={`shadow-md hover:border-transparent hover:ring-2 hover:ring-blue-500 hover:scale-105 duration-200`}
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}

export default ImageDisplay;
