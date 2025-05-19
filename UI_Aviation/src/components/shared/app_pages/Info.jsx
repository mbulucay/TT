import React from "react";
import { BsCcCircleFill } from "react-icons/bs";

function Info() {
  return (
    <div className="flex flex-col justify-center gap-6 p-6">
      <div className="flex flex-col bg-blue-300 p-4 drop-shadow-2xl shadow-2xl gap-2">
        <h2 className="font-bold">About Us</h2>
        <p>
          &emsp; The enterprise application developed is a comprehensive suite
          designed to enhance maritime situational awareness by utilizing
          diverse datasets and functionalities provided through several
          reference applications. Each application serves a unique purpose
          within the maritime domain, tailored to meet the operational needs of
          maritime authorities and organizations.
          <br /> <br />
          1. <strong>Person of Maritime Interest Application:</strong> This
          application allows users to manage data regarding individuals who are
          of interest in maritime activities, including owners, crew members,
          and passengers. It supports functionalities such as creating,
          updating, and annotating profiles, thereby aiding in heightened
          security and monitoring efforts.
          <br /> 2. <strong>IHS Fairplay Application:</strong> Focuses on
          processing information related to vessels, maritime companies, and
          shipping entities. It integrates data from IHS Fairplay to validate
          and manage vessel information, enhancing the accuracy of maritime
          operations.
          <br /> 3. <strong>Lloyds MIU Application:</strong> This application
          leverages data from Lloyd's Maritime Intelligence to offer insights
          into vessel movements, company profiles, and maritime incidents,
          facilitating deeper risk assessments and operational planning.
          <br /> 4. <strong>MOU Detention Lists Application:</strong> It
          supports the management of detention lists, helping users track and
          scrutinize vessels that have been detained or banned, which is crucial
          for regulatory compliance and safety enforcement.
          <br /> 5. <strong>MSc Application:</strong> Utilizes ship
          characteristic data from the Office of Naval Intelligence to provide
          detailed insights into vessel specifications, supporting thorough
          assessments and investigations of vessels of interest.
          <br /> 6. <strong>Ports Application:</strong> Provides exhaustive
          information on ports worldwide, enabling users to access detailed
          descriptions of port facilities and services, which is vital for
          logistical and operational planning.
          <br /> 7. <strong>Shipping Routes Network Application:</strong> This
          tool allows for the creation and management of shipping routes,
          assisting in the planning and optimization of maritime navigation
          based on historical and real-time data.
          <br /> <br />
          &emsp;Each application is integrated into a robust web interface built
          with ReactJS, ensuring a responsive and user-friendly experience for
          end-users. This interface supports real-time data interaction and
          visualization, making it an indispensable tool for maritime operations
          that demand precision, reliability, and scalability.
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
