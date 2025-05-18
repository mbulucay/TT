import React from "react";
import PersonList from "./PersonList";
import HeaderComponent from "./HeaderComponent";

function Person() {
  return (
    <div>
      <div className="relative z-10">
        <HeaderComponent />
      </div>
      <div className="relative z-10">
        <PersonList />
      </div>
      <div className="mt-3 bg-blue-100 p-8">The Person of Maritime Interest Application enables operators to find, annotate, store and disseminate information about people related to maritime interests
in order to support enhanced Maritime Situational Awareness.</div>
    </div>
  );
}

export default Person;
