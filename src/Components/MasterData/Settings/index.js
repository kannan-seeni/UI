// import React from "react";
// import OutTurn from './OutTurn';
// import GunnyCondition from './ GunnyCondition';
// import GradeVariety from './GradeVariety';
// const Settings = () => {
//   return(
//     <>
//       <OutTurn />
//       <GunnyCondition />
//       <GradeVariety />
//     </>
//   )
// }

// export default Settings;
import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import OutTurn from './OutTurn';
import GunnyCondition from './ GunnyCondition';
import GradeVariety from './GradeVariety';
export default function App() {
  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <div className="mt-5 container-fluid p-4">
      <MDBTabs className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            OutTurn
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
          GunnyCondition
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
          GradeVariety
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'tab1'}><OutTurn /></MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}><GunnyCondition /></MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab3'}><GradeVariety /></MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}
// import React, { useState } from 'react';
// import {
//   MDBTabs,
//   MDBTabsItem,
//   MDBTabsLink,
//   MDBTabsContent,
//   MDBTabsPane
// } from 'mdb-react-ui-kit';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';  // Ensure CSS is imported

// import OutTurn from './OutTurn';
// import GunnyCondition from './GunnyCondition';  // Fixed import path
// import GradeVariety from './GradeVariety';

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState('tab1'); // Default tab

//   return (
//     <div className="mt-5 container-fluid p-4">
//       <MDBTabs fill>
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => setActiveTab('tab1')}
//             active={activeTab === 'tab1'}
//           >
//             OutTurn
//           </MDBTabsLink>
//         </MDBTabsItem>
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => setActiveTab('tab2')}
//             active={activeTab === 'tab2'}
//           >
//             GunnyCondition
//           </MDBTabsLink>
//         </MDBTabsItem>
//         <MDBTabsItem>
//           <MDBTabsLink
//             onClick={() => setActiveTab('tab3')}
//             active={activeTab === 'tab3'}
//           >
//             GradeVariety
//           </MDBTabsLink>
//         </MDBTabsItem>
//       </MDBTabs>

//       <MDBTabsContent>
//         <MDBTabsPane show={activeTab === 'tab1'}>
//           <OutTurn />
//         </MDBTabsPane>
//         <MDBTabsPane show={activeTab === 'tab2'}>
//           <GunnyCondition />
//         </MDBTabsPane>
//         <MDBTabsPane show={activeTab === 'tab3'}>
//           <GradeVariety />
//         </MDBTabsPane>
//       </MDBTabsContent>
//     </div>
//   );
// };

// export default Settings;
