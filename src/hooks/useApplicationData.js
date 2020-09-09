import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day: day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [first, second, third] = all;
      const newState = { ...state, days: first.data, appointments: second.data, interviewers: third.data }
      setState(newState)
    });
  }, []);

  function bookInterview(id, interview) {
    let dayIndex = undefined;
    const days = [...state.days];
    // console.log(days);
    days.forEach((day, index) => {
      if (day.appointments.includes(id)) {
        dayIndex = index;
      }
    });
    if (!state.appointments[id].interview) {
      days[dayIndex].spots--
    };
    // console.log(days[dayIndex]);
    // console.log(state.appointments[id]);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments, days
        });
        return true;
      });
  }

  function cancelInterview(id) {
    let dayIndex = undefined;
    const days = [...state.days];

    days.forEach((day, index) => {
      if (day.appointments.includes(id)) {
        dayIndex = index;
      }
    });

    if (state.appointments[id].interview) {
      days[dayIndex].spots++
    };

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments
        });
        return true;
      });
  }
  return { state, setDay, bookInterview, cancelInterview }
}