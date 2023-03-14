import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../store";
import ArrowSVG from "../../public/images/work/protecting-meta/process-arrow.svg";

/**
 * Given an array of items i.e. Step 1, Step 2,
 * @param props – array of titles
 * @returns – dynamic circles
 */
export default function ProcessVisual(props) {
  const { headings } = props;
  const { windowStoreState } = useContext(GlobalContext);
  const { window } = windowStoreState;
  const [isLargeDevice, setIsLargeDevice] = useState(false);

  useEffect(() => {
    if (window.width > 768) {
      setIsLargeDevice(true);
    }
  }, []);

  return (
    <>
      <div className="process-div">
        {headings.map((item, i) => {
          if (i + 1 === headings.length) {
            return (
              <div className="process-circle">
                <p>{item}</p>
              </div>
            );
          }
          return (
            <>
              <div className="process-circle">
                <p>{item}</p>
              </div>
              <img src={ArrowSVG.src} alt="arrow" className="process-arrow" />
            </>
          );
        })}
      </div>
    </>
  );
}
