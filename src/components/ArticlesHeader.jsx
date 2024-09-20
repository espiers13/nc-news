import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";

function ArticlesHeader(topics, topic) {
  const allTopics = topics.topics;

  return (
    <>
      <header></header>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ color: "#33272a", marginTop: 5 }}
        >
          View By Topic
        </Typography>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ButtonGroup
            aria-label="Topics Menu"
            fullWidth
            sx={{ backgroundColor: "#00473e" }}
          >
            {allTopics.map((topic) => {
              return (
                <Button
                  label={topic.slug}
                  color="#00473e"
                  aria-label={topic.slug}
                  key={topic.slug}
                >
                  <a href={`/${topic.slug}`}>{topic.slug}</a>
                </Button>
              );
            })}
            <Button
              label="All Articles"
              color="#00473e"
              aria-label="All Articles"
              key="All Articles"
            >
              <a href={`/`}>All Articles</a>
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
}

export default ArticlesHeader;
