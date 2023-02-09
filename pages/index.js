import Head from 'next/head'
import { Guest } from '@/src/components/home/guest'
import { User } from '@/src/components/home/user'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import Layout from '@/src/components/layout/layout';


export default function Home() {
  const router = useRouter();
  const session = Cookies.get('username');

  function handleSignOut(){
    Cookies.remove('username');
    
    router.push('/login');
  }

  return (
    <Layout>
        <Head>
            <title>Home</title>
        </Head>        
        {session!=null ? User({session, handleSignOut}) : Guest()} 
    </Layout>
  )
}