import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from '../../store/store';
import { getCompanies, getSelectedCompany, selectCompany } from '../../store/jobSlice';


export default function MUISelect() {
  const companies = useSelector(getCompanies);
  const selectedCompany = useSelector(getSelectedCompany);
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    dispatch(selectCompany(event.target.value))
  };
  return (

    <select 
    style={{height: 50}}
    onChange={handleChange}
    value={selectedCompany}>
        {companies && ["All",...companies].map((company: string, index: number)=> {
      return(
        <option value={company}>{company}</option>
        )
       })}

</select>
 
  );
};