import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200', // Replace this with your Elasticsearch server URL
  auth: {
    username: 'Talib', // Optional, if you have authentication enabled
    password: 'Talib@03$22', // Optional, if you have authentication enabled
  },
});

// Check connection to the Elasticsearch cluster
const checkConnection = async () => {
  try {
    await client.ping();
    console.log('Elasticsearch is connected');
  } catch (error) {
    console.error('Elasticsearch cluster is down!', error);
  }
};

checkConnection();

export { client };
