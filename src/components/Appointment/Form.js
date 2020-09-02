import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function (props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setInterviewer(null);
    setName("");
  };

  const cancel = () => {
    props.onCancel();
    reset();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={props.name}
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={props.interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={props.onCancel} danger>Cancel</Button>
          <Button onClick={props.onSave} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};