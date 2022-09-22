import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import React, { useEffect } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { db } from './firebase';

function App() {
  useEffect(() => {
    onSnapshot(collection(db, 'customersData'), (snapshot) => {
      const a = snapshot.docs.map((doc) => doc.data());
      const add = () => {
        addDoc(collection(db, 'customersData'), {
          todo: 'hello world',
          timestamp: serverTimestamp(),
        });
      };
    });
  }, []);

  return (
    <Layout>
      <Seo />
    </Layout>
  );
}

export default App;
