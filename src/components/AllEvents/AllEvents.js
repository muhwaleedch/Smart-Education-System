import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useDispatch} from 'react-redux';
import ReactTable from 'react-table-6';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useFormik} from 'formik';
import {useRouter} from 'next/router';

import FUNCTION_UTILS from './../../utils/formik-utils';

import 'react-table-6/react-table.css';

const AllEvents = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [dialogue, setDialogue] = useState(false);
  const [variables, setVariables] = useState({page: 1});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    setLoading(true);
    setEvents([
      {
        category: 'afsdfsd',
        title: 'sdfsdfs',
        description: 'sdfsdfs',
        lastDate: 'sdfsdf',
        time: 'dasd',
        venue: 'asdasd',
      },
    ]);
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      category: '',
      title: '',
      description: '',
      lastDate: '',
      time: '',
      venue: '',
    },
    onSubmit: values => {
      handleDialogSave(values);
    },
  });

  const handlePageChange = pg => {
    setVariables({
      ...variables,
      page: pg + 1,
    });
  };

  const handleSearch = e => {
    e.preventDefault();
    let obj = {};
    const formData = new FormData(e.target);
    for (let [key, value] of formData.entries()) {
      obj[key] = value;
    }

    let searchVal = obj.value;
    if (searchVal) {
      setVariables({
        ...variables,
        _any: searchVal,
        page: 1,
        searchBy: [obj.searchBy],
      });
    }
  };

  const columns = [
    {
      Header: 'Category',
      accessor: 'category',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Title',
      accessor: 'title',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Description',
      accessor: 'description',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Time',
      accessor: 'time',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Venue',
      accessor: 'venue',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Actions',
      style: {textAlign: 'center'},
      accessor: '',
      Cell: props => (
        <div className="d-flex justify-content-evenly">
          <div
            style={{cursor: 'pointer'}}
            onClick={() => {
              handleEdit(props.original);
            }}>
            Edit
          </div>
          <div
            style={{cursor: 'pointer'}}
            onClick={() => {
              handleDelete(props.original);
            }}>
            Delete
          </div>
        </div>
      ),
    },
  ];

  const handleEdit = data => {
    setDialogue(true);
    formik.setValues(data);
  };

  const handleDelete = data => {
    console.log('delete click', data);
  };

  const handleDialogCancel = () => {
    setDialogue(false);
  };
  const handleDialogSave = values => {
    console.log('values', values);
    setDialogue(false);
  };

  const CustomNoDataComponent = () => {
    if (loading) {
      return null;
    }
    return <div>No events found</div>;
  };

  return (
    <main>
      <section className="hero__area hero__height align-items-center grey-bg-2 p-relative">
        <div className="hero__shape">
          <img
            className="hero-1-circle"
            src="assets/img/shape/hero/hero-1-circle.png"
            alt="img not found"
          />
          <img
            className="hero-1-circle-2"
            src="assets/img/shape/hero/hero-1-circle-2.png"
            alt="img not found"
          />
          <img
            className="hero-1-dot-2"
            src="assets/img/shape/hero/hero-1-dot-2.png"
            alt="img not found"
          />
        </div>
        <div className="container">
        <div className="row">
          <div className="col-xxl-6 offset-xxl-3">
            <div className="section__title-wrapper mt-60 text-center mb-60">
              <h2 className="section__title">
                <span className="yellow-bg">
                  Events
                  <img
                    src="assets/img/shape/yellow-bg-2.png"
                    alt="img not found"
                  />
                </span>
                <br />
              </h2>
            </div>
            <div className="header__btn d-flex justify-content-end ">
              <Link href="/add-event">
                <a className="e-btn">Add New Event</a>
              </Link>
            </div>
            <br />
          </div>
        </div>

          <div className="mt-20">
            <ReactTable
              className="invoices-table"
              loading={loading}
              NoDataComponent={CustomNoDataComponent}
              loadingText={<div>...loading</div>}
              data={events ? events : []}
              columns={columns}
              onPageChange={pg => handlePageChange(pg)}
              page={variables.page - 1}
              manual
              pages={Math.ceil(events.length / 10)}
              showPageSizeOptions={false}
              showPageJump={true}
              minRows={1}
            />
          </div>
          <Dialog
            open={dialogue}
            onClose={() => setDialogue(false)}
            fullWidth={'md'}>
            <DialogTitle>Add Event</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
              <DialogContent>
                <div className="sign__input-wrapper mb-10">
                  <h6>Category Name</h6>
                  <div className="sign__input">
                    <input
                      type="text"
                      placeholder="Enter Category Name"
                      name="category"
                      value={formik.values['category']}
                      onChange={formik.handleChange}
                      style={{
                        border:
                          formik.touched['category'] &&
                          formik.errors['category']
                            ? '2px solid #FF6565'
                            : null,
                      }}
                    />
                    {FUNCTION_UTILS.getFormikError(formik, 'category')}
                  </div>
                </div>
                <div className="sign__input-wrapper mb-10">
                  <h6>Event Title</h6>
                  <div className="sign__input">
                    <input
                      type="text"
                      placeholder="Enter Event Title"
                      name="title"
                      value={formik.values['title']}
                      onChange={formik.handleChange}
                      style={{
                        border:
                          formik.touched['title'] && formik.errors['title']
                            ? '2px solid #FF6565'
                            : null,
                      }}
                    />
                    {FUNCTION_UTILS.getFormikError(formik, 'title')}
                  </div>
                </div>
                <div className="sign__input-wrapper mb-10">
                  <h6>Event Description</h6>
                  <div className="sign__input">
                    <input
                      type="text"
                      placeholder="Enter Event Description"
                      name="description"
                      value={formik.values['description']}
                      onChange={formik.handleChange}
                      style={{
                        border:
                          formik.touched['description'] &&
                          formik.errors['description']
                            ? '2px solid #FF6565'
                            : null,
                      }}
                    />
                    {FUNCTION_UTILS.getFormikError(formik, 'description')}
                  </div>
                </div>
                <div className="sign__input-wrapper mb-10">
                  <h6>Last Date</h6>
                  <div className="sign__input">
                    <input
                      type="text"
                      placeholder="Enter Event Last Date"
                      name="lastDate"
                      value={formik.values['lastDate']}
                      onChange={formik.handleChange}
                      style={{
                        border:
                          formik.touched['lastDate'] &&
                          formik.errors['lastDate']
                            ? '2px solid #FF6565'
                            : null,
                      }}
                    />
                    {FUNCTION_UTILS.getFormikError(formik, 'lastDate')}
                  </div>
                </div>
                <div className="sign__input-wrapper mb-10">
                  <h6>Event Time</h6>
                  <div className="sign__input">
                    <input
                      type="text"
                      placeholder="Enter Event Time"
                      name="time"
                      value={formik.values['time']}
                      onChange={formik.handleChange}
                      style={{
                        border:
                          formik.touched['time'] && formik.errors['time']
                            ? '2px solid #FF6565'
                            : null,
                      }}
                    />
                    {FUNCTION_UTILS.getFormikError(formik, 'time')}
                  </div>
                </div>
                <div className="sign__input-wrapper mb-10">
                  <h6>Event Venue</h6>
                  <div className="sign__input">
                    <input
                      type="text"
                      placeholder="Enter Event Venue"
                      name="venue"
                      value={formik.values['venue']}
                      onChange={formik.handleChange}
                      style={{
                        border:
                          formik.touched['venue'] && formik.errors['venue']
                            ? '2px solid #FF6565'
                            : null,
                      }}
                    />
                    {FUNCTION_UTILS.getFormikError(formik, 'venue')}
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleDialogCancel()}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      </section>
    </main>
  );
};

export default AllEvents;
