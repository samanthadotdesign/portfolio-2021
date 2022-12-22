import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../store";
import { ArrowSVG } from "../../public/images/work/protecting-meta/process-arrow.svg";

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
      {headings.map((item) => {
        return (
          <div className="process-circle">
            <p>{item}</p>
          </div>
        );
      })}
    </>
  );
}
