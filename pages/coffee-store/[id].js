import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";

import cls from 'classnames'

import coffeeStoresData from "../../data/coffee-stores.json";
import { fetchCoffeStores } from "../../lib/coffee-stores";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const coffeeStores = await fetchCoffeStores();

  

  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.fsq_id.toString() === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeStores();

  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export const CoffeeStore = (props) => {
  const router = useRouter();
  console.log(router);

  console.log(props);
  if (router.isFallback) {
    return "Loading";
  }

  const handleUpvoteButton = (e)=> {
      console.log("handle upvote")
  }

  const { name, location, neighbourhood, imgUrl } = props.coffeeStore;
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
      <div className={styles.col1}>
        <div className={styles.backToHomeLink}>
        <Link href="/">
          <a>← Back to home</a>
        </Link> 
        </div>
        <div className={styles.nameWrapper}>
        <h1 className={styles.name}>{name}</h1>
        </div>
      <Image src={imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"} width={600} height={360} className={styles.storeImg} alt={name}></Image>
        
      </div>
      <div className={cls("glass",styles.col2)}>
        <div className={styles.iconWrapper}> 
          <Image src="/icons/nearMe.svg" width={"24"} height={"24"} />
            <p className={styles.text}>{location.address}</p>
        </div>
        <div className={styles.iconWrapper}> 
          <Image src="/icons/places.svg" width={"24"} height={"24"}/>
            <p className={styles.text}>{location.locality} {location.postcode}</p>
        </div>
        
        <div className={styles.iconWrapper}> 
          <Image src="/icons/star.svg" width={"24"} height={"24"}/>
            <p className={styles.text}>{1}</p>
        </div>
        <button className={styles.upvoteButton} onClick={handleUpvoteButton}> up vote! </button>
      </div>
    </div> 
    </div>
  );
};

export default CoffeeStore;
