"use client"
import { Button } from '@/uff-ui';
import { client } from '@/uff-api-client';
import { useEffect, useState } from 'react';

export default function Index() {

  const [testData, setTestData] = useState<string>("");
  
  useEffect(() => {
    (async () => {
      const data = await client.api.v1.user.me.$get();
      setTestData((await data.json()).message);
    })();
  }, []);
  return (
    <div className="p-4 border-b">
      <Button>Hello</Button>
      <span className="text-2xl font-bold">{testData}</span>
    </div>
  );
}
