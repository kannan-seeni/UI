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
  MDBTabsPane, MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import OutTurn from './OutTurn';
import GunnyCondition from './ GunnyCondition';
import GradeVariety from './GradeVariety';
import './../master.css';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('outturn');

  const handleBasicClick = (value) => {
    if (value === activeTab) {
      return;
    }

    setActiveTab(value);
  };

  return (
    <div className="mt-5 container-fluid p-4 tabMaster">
      <MDBRow>
        <MDBCol md='12' className='my-3'>
          <MDBTabs className='mb-3'>
            <MDBTabsItem className='mx-2'>
              <MDBTabsLink onClick={() => handleBasicClick('outturn')} active={activeTab === 'outturn'}>
                OutTurn
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem className='mx-2'>
              <MDBTabsLink onClick={() => handleBasicClick('gunnycondition')} active={activeTab === 'gunnycondition'}>
                GunnyCondition
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem className='mx-2'>
              <MDBTabsLink onClick={() => handleBasicClick('gradevariety')} active={activeTab === 'gradevariety'}>
                GradeVariety
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane open={activeTab === 'outturn'}><OutTurn /></MDBTabsPane>
            <MDBTabsPane open={activeTab === 'gunnycondition'}><GunnyCondition /></MDBTabsPane>
            <MDBTabsPane open={activeTab === 'gradevariety'}><GradeVariety /></MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>

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
