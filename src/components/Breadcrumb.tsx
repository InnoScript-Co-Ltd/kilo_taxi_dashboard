import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface breadcrumb {
  label: string;
  url: string;
}

export const Breadcrumb = () => {
  const loaderData: any = useLoaderData();
  const breadcrumbs: breadcrumb[] = loaderData.breadcrumbs;
  const navigate = useNavigate();

  const location = useLocation();

  const [list, setList] = useState<any>([]);

  useEffect(() => {
    const newList: JSX.Element[] = []; // Create a new list to avoid stale state

    const LinkTag = (name: string, href: string) => {
        return (
            <Link
                underline="hover"
                key={name} // Use name as key to avoid duplicate keys
                // color="inherit"
                href={href}
                onClick={(e) => {
                    e.preventDefault(); // Prevent default navigation
                    navigate(href); // Use navigate for SPA navigation
                }}
            >
                {name}
            </Link>
        );
    };

    const TypoTag = (name: string) => {
        return (
            <Typography color="inherit" key={name} sx={{ color: "text.primary" }}>
                {name}
            </Typography>
        );
    };

    try {
        if (breadcrumbs.length > 0) {
            breadcrumbs.forEach((path: any) => {
                if (location.pathname === path.url) { // Compare with path.url
                    newList.push(TypoTag(path.label));
                    // newList.push(LinkTag(path.label, path.url));
                } else {
                    newList.push(LinkTag(path.label, path.url));
                    // newList.push(TypoTag(path.label)); // Use path.label for the TypoTag
                }
            });
        }
        setList(newList); // Update state once after constructing the new list
    } catch (e) {
        console.error(e);
    }
}, [breadcrumbs, location.pathname, navigate]); // Add location.pathname and navigate as dependencies


  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {list}
      </Breadcrumbs>
    </>
  );
};
