import { useState, useRef } from "react";
import Head from "next/head";
import {
  Wrapper,
  Card,
  Text,
  Box,
  Input,
  Flex,
  Button,
  theme,
} from "sriracha-ui";
import axios from "axios";

export default function Index({ sets }) {
  const [search, setSearch] = useState(sets);
  const searchRef = useRef(null);
  const filterRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(
      sets.filter((set) =>
        set.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const handleFilterSets = (e) => {
    e.preventDefault();
    searchRef.current.value = "";

    e.target.value === "All Sets"
      ? setSearch(sets)
      : setSearch(
          sets.filter((set) =>
            e.target.value === "All Sets"
              ? set.type
              : set.type === e.target.value
          )
        );

    searchRef.current.focus();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    searchRef.current.value = "";
    filterRef.current.value = "All Sets";
    setSearch(sets);
  };
  return (
    <Wrapper className="bg">
      <Head>
        <title>ESO Set Library Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card shade w="96%" maxW="55rem" invert>
        <Text as="h1" bold xlf color={theme.colors.amber5}>
          Welcome to <span className="health">FireNinja's 🔥</span> ESO Set
          Search Tool
        </Text>
        <Text>
          To use this API go to{" "}
          <a href="https://eso-sets.herokuapp.com">
            https://eso-sets.herokuapp.com
          </a>
        </Text>
        <Text>
          All this data has been gather from{" "}
          <a href="https://eso-sets.com">eso-sets.com</a>
        </Text>
      </Card>
      <Card invert shade w="96%" maxW="55rem">
        <Flex as="form" onSubmit={handleSubmit} drape stretch>
          <Text lf bold color={theme.colors.orange5} as="label">
            Search for a set:
          </Text>
          <Input
            maxW="85%"
            w="35rem"
            placeholder="Type the name of a set..."
            onChange={handleSearch}
            ref={searchRef}
          />
          <Box h="1rem" />
          <Text lf bold color={theme.colors.orange5} as="label">
            Filter sets by type:
          </Text>
          <Input
            maxW="85%"
            w="35rem"
            as="select"
            onChange={handleFilterSets}
            ref={filterRef}
          >
            <option value="All Sets">All Sets</option>
            <option value="Craftable">Craftable</option>
            <option value="Overland">Overland</option>
            <option value="Arena">Arena</option>
            <option value="Monster Set">Monster Set</option>
            <option value="Dungeon">Dungeon</option>
            <option value="Trail">Trail</option>
            <option value="PvP">PvP</option>
            <option value="Unknown">Unknown</option>
            <option value="Mythic">Mythic</option>
          </Input>
          <Box h="1rem" />
          <Button type="submit" red>
            Reset Search
          </Button>
        </Flex>
      </Card>
      <Flex wrap="true" jcCenter>
        {search &&
          search.map((set) => (
            <Card
              key={set.id}
              w="96%"
              maxW="35rem"
              h="100%"
              invert
              shade
              radius="0.5rem"
              p="0.4rem 2rem"
              as="a"
              href={set.link}
              pointer
              hvrColor={theme.colors.gray0}
            >
              <Text bold lf color={theme.colors.amber5} pointer>
                {set.name}
              </Text>
              <Box stretch h="0.1rem" bg={theme.colors.amber1} />
              <Text pointer>
                <strong>Type:</strong>{" "}
                <span style={{ color: theme.colors.brown2 }}>{set.type}</span>
              </Text>
              <Box stretch h="0.1rem" bg={theme.colors.amber1} />
              <Text
                pointer
                m="0 0 1rem 0"
                dangerouslySetInnerHTML={{ __html: set.bonuses }}
              />
            </Card>
          ))}
      </Flex>
    </Wrapper>
  );
}

Index.getInitialProps = async () => {
  const { data } = await axios.get("https://eso-sets.herokuapp.com/sets");
  return {
    sets: data,
  };
};
