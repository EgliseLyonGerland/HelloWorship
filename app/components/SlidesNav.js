import React, { Component } from 'react';
import { styled } from '@material-ui/styles';
import range from 'lodash/range';

const Wrapper = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',

  '&:after': {
    content: '""',
    position: 'absolute',
    height: '70%',
    width: 1,
    right: 1,
    top: '15%',
    backgroundImage:
      'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
  },
});

const Inner = styled('div')({
  maxHeight: '100%',
  overflowY: 'auto',
  padding: [[24, 24, 24, 0]],
});

const ThumbnailWrapper = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: 24,

  '&:last-child': {
    marginBottom: 0,
  },
});

const ThumbnailPosition = styled('div')({
  width: 32,
  paddingRight: 8,
  textAlign: 'right',
  fontSize: '0.75em',
  color: 'rgba(255,255,255,0.7)',
});

const ThumbnailImageWrapper = styled('div')({
  flexGrow: 1,
  cursor: 'pointer',
  transition: 'transform .2s',

  '&:hover': {
    transform: 'translateX(5px)',
    transition: 'transform .2s .1s',
  },
});

const ThumbnailImage = styled('div')(({ active }) => ({
  paddingBottom: '56.25%',
  borderRadius: 2,
  border: [['solid', 1]],
  borderColor: active ? '#F9B74F' : 'rgba(255,255,255,0.7)',
  boxShadow: [[0, 0, 5, 'rgba(0,0,0,0.6)']],
  backgroundSize: 'cover',
}));

export default class SlidesNav extends Component {
  render() {
    return (
      <Wrapper>
        <Inner>
          {range(0, 20).map(index => (
            <ThumbnailWrapper key={index}>
              <ThumbnailPosition>{index + 1}</ThumbnailPosition>
              <ThumbnailImageWrapper>
                <ThumbnailImage
                  active={index === 3}
                  style={{
                    backgroundImage: `url(https://picsum.photos/id/${index +
                      10}/100/60)`,
                  }}
                />
              </ThumbnailImageWrapper>
            </ThumbnailWrapper>
          ))}
        </Inner>
      </Wrapper>
    );
  }
}
