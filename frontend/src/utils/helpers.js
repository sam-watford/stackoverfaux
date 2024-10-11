import parse from "html-react-parser";

export const transformBodyWithNoReferrer = (body) => {
  const transform = (node) => {
    // Ensure the node is an element and specifically an <img> tag
    if (node.type === "tag" && node.name === "img") {
      node.attribs = {
        ...node.attribs,
        referrerpolicy: "no-referrer",
      };
    }
    return node;
  };

  // Parse and apply transformations with the transform function
  return parse(body, { replace: transform });
};
