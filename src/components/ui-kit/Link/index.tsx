import React from "react";
import './index.scss';
import styled from "styled-components";

const StyledLink = styled.a`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #6E6D79;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover {
    text-decoration: none;
    transition: all 0.2s;
    color: #8533FF;
  }

  &::after {
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    background: #6E6D79;
  }

  &:hover::after {
    transition: all 0.2s;
    background: #8533FF;
    opacity: .7;
  }
`

type LinkPropType = {
  children: string | React.ReactNode,
  href: string
}

const LinkDefaultProps = {}

const Link = (props: LinkPropType) => {
  const {children, href} = props;
  return <StyledLink href={`https://abit.itmo.ru/programs/bachelor?title=${href}`} target="_blank">{children}</StyledLink>
};

Link.defaultProps = LinkDefaultProps

export default Link
