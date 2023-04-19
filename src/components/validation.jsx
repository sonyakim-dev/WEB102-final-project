import {useState, useEffect} from 'react';

export default function validation(value) {
  // const errors = {}
  let isValid = true;

  if (value.username === "") isValid = false
  if (value.password === "") isValid = false
  if (value.title === "") isValid = false  
  if (value.event_date === "") isValid = false  
  if (value.event_id === "") isValid = false  
  if (value.rate === "") isValid = false  
  if (value.content === "") isValid = false

  return isValid;
}