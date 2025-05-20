import React from "react";
import { BsCcCircleFill } from "react-icons/bs";

function Info() {
  return (
    <div className="flex flex-col justify-center gap-6 p-6">
      <div className="flex flex-col bg-blue-300 p-4 drop-shadow-2xl shadow-2xl gap-2">
        <h2 className="font-bold">About Us</h2>
        <p>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate iure, 
         blanditiis earum tempora consequatur fugit id sit a iste vitae facere voluptates perspic
         iatis cum alias praesentium sapiente nam ea nobis! Possimus, suscipit nulla id asperiores quas de
         lectus ex dolor, voluptatibus excepturi quasi laboriosam quis ab nostrum quam dignissimos iure li
         bero fugiat. Cumque sequi enim voluptates nostrum molestiae! Voluptates, corrupti nemo repellendu
         s atque mollitia tempore suscipit quas alias eum reprehenderit perferendis impedit, rerum quasi el
         igendi. Consectetur architecto cupiditate adipisci officiis dolorum laboriosam accusantium itaque
          asperiores. Tempora, ullam inventore. Velit sunt reprehenderit excepturi nesciunt tempora, nihil 
          accusamus perspiciatis aperiam distinctio fugit, maiores eius, aut mollitia laboriosam quam cupidi
          tate ea. Eveniet, accusamus? Consectetur nihil voluptatum quaerat! Ipsam labore cumque iure, provi
          ent nesciunt dolorem, doloribus sapiente voluptatum quisquam consequatur quas vel magni harum dolor
          um, neque minus magnam! Eaque culpa perferendis corporis praesentium perspiciatis harum, veritatis te
          mporibus iure ad id hic expedita nemo beatae excepturi impedit nulla incidunt, quasi porro ea reic
          iendis aliquam! Voluptate rerum similique, sed saepe fugit placeat, laborum aliquam perfer
          endis doloremque aperiam totam modi sunt unde illo nesciunt repellat porro sequi quaerat. Du
          cimus repellendus unde quae sint cupiditate fugit ipsum error adipisci assumenda et nesciu
          nt esse, officia commodi veniam nihil harum blanditiis aperiam, ipsam, numquam laboriosam re
          m! Saepe necessitatibus voluptatum vitae eveniet aliquam deleniti iusto. Ducimus adipisci cupi
          ditate dicta quibusdam nobis ut blanditiis qui dolores eveniet alias non, totam amet harum ipsa, 
          reprehenderit aperiam doloremque ratione odit consectetur tempore accusantium facere, laborum quas.
          Doloremque commodi quasi nobis, delectus error maxime natus est fuga reprehenderit voluptatibus eius 
          nihil magnam pariatur porro ex aut nesciunt ratione, veritatis doloribus architecto dolorum alias esse
          ullam rem? Atque velit laborum hic voluptatum dignissimos. Porro at dolorum nemo blanditiis ut tota
          m voluptatibus odit quos, dolor ullam officiis maiores accusantium unde quidem provident suscipit 
          voluptatum a quis quo culpa sequi. Facilis aperiam doloribus neque odit eius esse itaque eveniet 
          quos distinctio, inventore alias corrupti cupiditate repellendus dignissimos, pariatur recusandae
          ducimus eligendi nulla adipisci, laudantium voluptatibus harum obcaecati blanditiis maxime! Volu
          0ptatibus numquam quisquam, voluptates quos atque eos cumque? A, minus aliquam rerum laborum volup
        </p>
             
      </div>
      <div className="flex flex-col bg-blue-300 p-4 drop-shadow-2xl shadow-2xl gap-2">
        <h2 className="font-bold">Logo</h2>
        <p>
          &emsp;This logo was specifically designed for Blue Book application that
          monitors ship traffic and analyzes data. The design, dominated by blue
          and white colors, symbolizes the application's connection with the sea
          and offers a technology-oriented and professional appearance. The
          stylized ship and wave motif in the logo represents the constant flow
          and dynamism of maritime traffic. Additionally, the integrated book
          icon highlights the knowledge-based and education-focused approach of
          the app. This logo highlights the strong and reliable image of the
          brand with a modern and simple design approach.
        </p>
      </div>
      <div className="flex-grow"></div>
      <div className="flex w-full justify-center items-center p-1 rounded-full">
        <div className="flex-grow"></div>
        <div className="flex justify-center items-center gap-2 bg-white p-2 rounded-lg">
          <BsCcCircleFill />
          {/* <div className="font-thin text-center">
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Info;
