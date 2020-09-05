import Head from "next/head";
import { Wrapper, Card, Text, Box, theme } from "sriracha-ui";
import axios from "axios";

export default function Index({ sets }) {
  // console.log("data", sets);
  // const { data } = data;
  return (
    <Wrapper className="bg">
      <Head>
        <title>ESO Set Library Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {sets &&
        sets.map((set) => (
          <Card
            key={set.id}
            w="96%"
            maxW="35rem"
            invert
            shade
            radius="0.5rem"
            p="0.4rem 2rem"
          >
            <Text bold lf color={theme.colors.amber5}>
              {set.name}
            </Text>
            <Box stretch h="0.1rem" bg={theme.colors.amber1} />
            <Text>
              <strong>Type:</strong>{" "}
              <span style={{ color: theme.colors.brown2 }}>{set.type}</span>
            </Text>
            <Box stretch h="0.1rem" bg={theme.colors.amber1} />
            <Text dangerouslySetInnerHTML={{ __html: set.bonuses }} />
          </Card>
        ))}
    </Wrapper>
  );
}

Index.getInitialProps = async () => {
  const { data } = await axios.get("https://eso-sets.herokuapp.com/sets");
  return {
    sets: data,
  };
};
