import React, { Component } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then((res) => {
      // props.bookInterview(props.id, interview
      transition(SHOW);
    })
  };

  function deletingInterview(id) {
    transition(DELETING);
    props.cancelInterview(id).then(() => {
      transition(EMPTY);
    })
  };

  return (
    <article className="appointment"> <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={back} />}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === EDIT && <Status message={"EDIT"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onConfirm={() => deletingInterview(props.id)} onCancel={back} />}
    </article>
  );
};

