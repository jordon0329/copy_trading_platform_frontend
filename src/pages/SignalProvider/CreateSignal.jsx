import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../utils/api';

function CreateSignal() {
  const initialValues = {
    providerID: '',
    StrategyName: '',
    strategyDescription: '',
  };
  const [values, setValues] = React.useState(initialValues);
  const [accountData, setAccountData] = React.useState([]);
  const [createSignalButtonClicked, setCreateSignalButtonClicked] =
    React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      const response = await api.get(
        'http://localhost:5000/api/account/all-accounts'
      );
      setAccountData(response.data);
    }

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };

  const handleRegisterStrategy = async () => {
    try {
      setCreateSignalButtonClicked(true);
      if (
        values.providerID == '' ||
        values.StrategyName == '' ||
        values.strategyDescription == ''
      ) {
        toast.error('Please fill in all the information!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log('something error');
      } else {
        console.log(values);
        setIsLoading(true);
        const result = await api.post('/strategy/register-strategy', values);
        toast.success('Strategy registered successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/signal-provider');
        console.log(result);
        setIsLoading(false);
      }
    } catch (err) {
      toast.error('Strategy registration failed!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log(err);
    }
  };
  return (
    <div>
      <div style={{ padding: '0px 200px' }}>
        <div className="pb-3">
          <Link
            to={'/signal-provider'}
            className="flex flex-row items-center font-extrabold"
          >
            <ReplyRoundedIcon
              fontSize="medium"
              sx={{ color: 'white', fontWeight: 'bold' }}
            />
            <h1 className="text-white text-lg pl-2"> Signal Provider</h1>
          </Link>
        </div>
        <div
          className="mb-[20px] rounded bg-[#282D36]"
          style={{ color: 'white' }}
        >
          <header className="p-[18px]">
            <h2 className="mt-[5px] text-[20px] font-normal">Create Signal</h2>
          </header>
          <div
            className="p-[15px] bg-[#2E353E]"
            style={{ boxSizing: 'border-box' }}
          >
            <div
              style={{
                borderBottom: '1px solid #242830',
                paddingBottom: '15px',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'start',
              }}
            >
              <label
                className="text-[#ccc] text-[13px]"
                style={{
                  textAlign: 'right',
                  width: '25%',
                  paddingTop: '7px',
                  paddingRight: '15px',
                  paddingLeft: '15px',
                  display: 'inline-block',
                  position: 'relative',
                  maxWidth: '100%',
                }}
              >
                Signal Account
              </label>
              <div
                style={{
                  width: '50%',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                }}
              >
                <select
                  name="providerID"
                  required
                  className="bg-[#282d36] text-[#fff] px-3 py-1.5 rounded"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '34px',
                    padding: '6px 12px',
                    fontSize: '14px',
                    borderRadius: '4px',
                  }}
                  onChange={handleInputChange}
                >
                  <option value="" disabled selected className="hidden">
                    Select Account
                  </option>
                  {accountData.length > 0 &&
                    accountData
                      .filter(
                        (account) =>
                          account.copyFactoryRoles.indexOf('PROVIDER') !== -1
                      )
                      .map((account) => (
                        <option
                          key={account.accountID}
                          value={account.accountID}
                        >{`${account.name}(${account.login})`}</option>
                      ))}
                </select>
                {values.providerID == '' && createSignalButtonClicked && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                    Signal Account required!
                  </p>
                )}
              </div>
            </div>
            <div
              style={{
                borderBottom: '1px solid #242830',
                paddingBottom: '15px',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'start',
              }}
            >
              <label
                className="text-[#ccc] text-[13px]"
                style={{
                  textAlign: 'right',
                  width: '25%',
                  paddingTop: '7px',
                  paddingRight: '15px',
                  paddingLeft: '15px',
                  display: 'inline-block',
                  position: 'relative',
                  maxWidth: '100%',
                }}
              >
                Strategy Name
              </label>
              <div
                style={{
                  width: '50%',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                }}
              >
                <input
                  name="StrategyName"
                  type="text"
                  required
                  className="bg-[#282d36] text-[#fff] px-3 py-1.5 rounded"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '34px',
                    padding: '6px 12px',
                    fontSize: '14px',
                    borderRadius: '4px',
                  }}
                  onChange={handleInputChange}
                />
                {values.StrategyName == '' && createSignalButtonClicked && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                    Strategy Name required!
                  </p>
                )}
              </div>
            </div>
            <div
              style={{
                borderBottom: '1px solid #242830',
                paddingBottom: '15px',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'start',
              }}
            >
              <label
                className="text-[#ccc] text-[13px]"
                style={{
                  textAlign: 'right',
                  width: '25%',
                  paddingTop: '7px',
                  paddingRight: '15px',
                  paddingLeft: '15px',
                  display: 'inline-block',
                  position: 'relative',
                  maxWidth: '100%',
                }}
              >
                Strategy Description
              </label>
              <div
                style={{
                  width: '50%',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                }}
              >
                <input
                  name="strategyDescription"
                  type="text"
                  required
                  className="bg-[#282d36] text-[#fff] px-3 py-1.5 rounded"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '34px',
                    padding: '6px 12px',
                    fontSize: '14px',
                    borderRadius: '4px',
                  }}
                  onChange={handleInputChange}
                />
                {values.strategyDescription == '' &&
                  createSignalButtonClicked && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                      Strategy Description required!
                    </p>
                  )}
              </div>
            </div>
          </div>
          <div className="px-[15px] py-[10px]">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-start-4 col-span-4 pl-3.5">
                <LoadingButton
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    backgroundColor: '#1565C0!important',
                  }}
                  onClick={handleRegisterStrategy}
                  loading={isLoading}
                >
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                  Create signal page
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSignal;
