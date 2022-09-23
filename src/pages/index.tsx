import { Radio, Space } from 'antd';
import { collection, onSnapshot } from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect } from 'react';

import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

import { db } from '../firebase';

function App() {
  const [polls, setPolls] = React.useState<any[]>([]);
  const onOptionSelect = (event: any, poll: any) => {
    const newPollOutput = event;
    return newPollOutput;
  };
  useEffect(() => {
    if (polls.length == 0) {
      onSnapshot(collection(db, 'polls'), (snapshot) => {
        setPolls(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, []);
  return (
    <Layout>
      <Seo />
      <div
        className='h-screen w-screen'
        style={{
          backgroundColor: '#DFDBE5',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='12' height='24' viewBox='0 0 12 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M2 0h2v12H2V0zm1 20c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM9 8c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-1 4h2v12H8V12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        <div className='layout h-screen bg-bgAlt'>
          <h1 className='mb-4 pt-36 text-center'>Polls</h1>
          <div className='mb-12 text-center'>
            <UnderlineLink href='/create'>Create Poll</UnderlineLink>
          </div>
          {polls.map((poll, index) => {
            const pollDate = moment(poll.enddate * 1000);
            const today = moment.now();
            if (pollDate.isAfter(today)) {
              return (
                <div
                  className='my-4 mx-auto w-80 rounded border-2 bg-white p-4 lg:w-96'
                  key={index}
                >
                  <h3 key={poll.id}>{poll.title}</h3>

                  <Radio.Group
                    onChange={(event) => onOptionSelect(event, poll)}
                  >
                    <Space direction='vertical'>
                      {poll.options
                        .sort(() => Math.random() - 0.5)
                        .map((option: any, index: number) => (
                          <Radio key={index} value={option}>
                            {option}
                          </Radio>
                        ))}
                    </Space>
                  </Radio.Group>
                  <div className='mt-2 text-gray-400'>
                    Expiry date: {pollDate.format()}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </Layout>
  );
}

export default App;
