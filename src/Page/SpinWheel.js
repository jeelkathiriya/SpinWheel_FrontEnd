import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';


export default function SpinWheel() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [userData, setUserData] = useState();

  const data = [
    { option: 'test 0', style: { backgroundColor: 'green', textColor: 'black' } },
    { option: 'test 1', style: { backgroundColor: 'grey', textColor: 'black' } },
    { option: 'test 2', style: { backgroundColor: 'yellow'} },
    { option: 'test 3', style: { backgroundColor: 'red' } },
    { option: 'test 4', style: { backgroundColor: 'blue'} },
  ];

  useEffect(() => {
    fetchdata();
  }, []); // This effect runs only once when the component mounts

  // useEffect(() => {
  //   console.log('-------userData updated--------', userData);
  // }, [userData]); // This effect runs whenever userData changes

  const removeFields = (array) => {
    return array.map(({ _id, createdAt, ...rest }) => rest);
  };
  
  const fetchdata = () => {
          fetch("http://localhost:5001/api/user/getdata")
          .then((res) => res.json())
          .then(data => {
            const updatedData = removeFields(data.data);
            setUserData(updatedData);
        })
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      setPrizeNumber(1);
      setMustSpin(true);
    }
  };

  return (
    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        radiusLineColor={'white'}
        outerBorderColor={'white'}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </div>
  );
}
