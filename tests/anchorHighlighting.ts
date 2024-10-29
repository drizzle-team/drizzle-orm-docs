import handleAnchorHighlighting from "@/utils/handleAnchorHighlighting";

interface Props {
  viewportHeight: number;
  anchors: {
    id: string;
    offsetTop: number;
  }[];
  scrollTop: number;
}

const viewportHeight = 800;
const maxScrollTop = 20000;

const anchors = [
  {
    id: "modes",
    offsetTop: 1580,
  },
  {
    id: "declaring-relations",
    offsetTop: 2248,
  },
  {
    id: "one-to-one",
    offsetTop: 2330,
  },
  {
    id: "one-to-many",
    offsetTop: 3423,
  },
  {
    id: "many-to-many",
    offsetTop: 4908,
  },
  {
    id: "foreign-keys",
    offsetTop: 6018,
  },
  {
    id: "disambiguating-relations",
    offsetTop: 7582,
  },
  {
    id: "querying",
    offsetTop: 8508,
  },
  {
    id: "find-many",
    offsetTop: 10872,
  },
  {
    id: "find-first",
    offsetTop: 11189,
  },
  {
    id: "include-relations",
    offsetTop: 11578,
  },
  {
    id: "partial-fields-select",
    offsetTop: 12540,
  },
  {
    id: "nested-partial-fields-select",
    offsetTop: 14317,
  },
  {
    id: "select-filters",
    offsetTop: 14782,
  },
  {
    id: "limit--offset",
    offsetTop: 15573,
  },
  {
    id: "order-by",
    offsetTop: 16714,
  },
  {
    id: "include-custom-fields",
    offsetTop: 17448,
  },
  {
    id: "prepared-statements",
    offsetTop: 19732,
  },
];

const main = (props: Props) => {
  for (let i = 0; i < maxScrollTop; i += 100) {
    props.scrollTop = i;
  }
};

main({
  viewportHeight,
  anchors,
  scrollTop: 0,
});
