import React, { useEffect, useState } from 'react';
import { Button, Container, Paper } from '@mui/material';
import { useDispatch, useSelector } from '../../store/store';
import { fetchJobs, getJobsState, showRecentJobs } from '../../store/jobSlice';
import styles from '../../styles/Home.module.css';
import MUISelect from '../../components/select';


function JobsCard() {
  const dispatch = useDispatch();
  const jobs = useSelector(getJobsState);
  const [recentJobSwitch, setRecentJobSwitch] = useState(false);

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);


  const recentJobHandle = (val) => {
    setRecentJobSwitch(val);
    dispatch(showRecentJobs(val))
  }

  console.log(jobs, "jobs")
  return (
    <div className={styles.parent}>
      <div className={styles.description}>
        <MUISelect />
        <Button
          variant={recentJobSwitch ? "contained" : "outlined"}
          style={{ width: '20%', height: '38%' }}
          onClick={() => recentJobHandle(!recentJobSwitch)}>
          Last 7 Days Jobs
        </Button>

      </div>

      <Container className={styles.dataContainer}>

        {jobs && jobs.map((job, index) => {
          if (index < 10) {
            return (

              <Paper elevation={1} className={styles.paper}>
                <h3 className={styles.jobTitle}>
                  <i>{job.jobTitle}</i>
                </h3>
                <h3 className={styles.company}>
                  <i>{job.companyName}</i>
                </h3>
                <Paper variant="outlined" className={styles.desc}>
                  <div dangerouslySetInnerHTML={{ __html: job.jobDescription }}></div>
                </Paper>
              </Paper>

            )
          }
        })

        }
      </Container>
    </div>
  );
}

export default JobsCard;