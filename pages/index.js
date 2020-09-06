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
      search.filter((set) =>
        set.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    if (e.keyCode === 8 || e.keyCode === 46) {
      setSearch(
        search.filter((set) =>
          set.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
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
            // onKeyDown={handleKeyDown}
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
            <option value="Craftable Set">Craftable Set</option>
            <option value="Overland Set">Overland Set</option>
            <option value="Dungeon Set">Dungeon Set</option>
            <option value="Monster Helm Set">Monster Helm Set</option>
            <option value="Asylum Weapons Set">Asylum Weapons Set</option>
            <option value="Trail Set">Trail Set</option>
            <option value="Maelstorm Arena Set">Maelstorm Arena Set</option>
            <option value="Dragonstar Arena Set">Dragonstar Arena Set</option>
            <option value="Blackrose Weapons Set">Blackrose Weapons Set</option>
            <option value="Blackrose Prison Set">Blackrose Prison Set</option>
            <option value="Cyrodiil Set">Cyrodiil Set</option>
            <option value="Imperial City Set">Imperial City Set</option>
            <option value="Elite Gear Set">Elite Gear Set</option>
            <option value="Rewards For The Worthy Set">
              Rewards For The Worthy Set
            </option>
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
