import React, { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';


export default function SpinWheel() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [userData, setUserData] = useState([]);

  const data = 
    [
      {
          "option": "test",
          "style": {
              "backgroundColor": "green",
              "textColor": "black"
          }
      },
      {
          "option": "test1",
          "style": {
              "backgroundColor": "green",
              "textColor": "black"
          }
      },
      {
          "option": "test2",
          "style": {
              "backgroundColor": "green",
              "textColor": "black"
          }
      },
      {
          "option": "test3",
          "style": {
              "backgroundColor": "green",
              "textColor": "black"
          }
      }
  ];


  useEffect(() => {
    fetchdata();
  }, []); // This effect runs only once when the component mounts

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
      {!!userData && userData?.length > 0 && (
              <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={userData}
              radiusLineColor={'white'}
              outerBorderColor={'white'}
              onStopSpinning={() => {
                setMustSpin(false);
              }}
            />
      )}
      <button onClick={handleSpinClick}>SPIN</button>
    </div>
  );
}
