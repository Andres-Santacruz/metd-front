type IRenderTracksProps = React.HTMLAttributes<HTMLDivElement>;

export const renderTrack = ({ style, ...props }: IRenderTracksProps) => {
  const trackStyle: React.CSSProperties = {
    position: "absolute",
    maxWidth: "100%",
    width: 6,
    transition: "opacity 200ms ease 0s",
    opacity: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};
export const renderTrackRTL = ({ style, ...props }: IRenderTracksProps) => {
  const trackStyle: React.CSSProperties = {
    position: "absolute",
    width: 6,
    transition: "opacity 200ms ease 0s",
    opacity: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: "unset",
    left: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};
export const renderThumbDark = ({ style, ...props }: IRenderTracksProps) => {
  const thumbStyle = {
    borderRadius: 15,
    background: "rgba(222, 222, 222, .1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
export const renderThumbLight = ({ style, ...props }: IRenderTracksProps) => {
  const thumbStyle = {
    borderRadius: 15,
    background: "rgba(48, 48, 48, .1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
export const renderView = ({ style, ...props }: IRenderTracksProps) => {
  const viewStyle = {
    marginRight: -25,
  };
  return <div style={{ ...style, ...viewStyle }} {...props} />;
};
export const renderViewRTL = ({ style, ...props }: IRenderTracksProps) => {
  const viewStyle = {
    marginRight: "unset",
    marginLeft: -15,
  };
  return <div style={{ ...style, ...viewStyle }} {...props} />;
};

export const kanbanRenderTrack = ({ style, ...props }: IRenderTracksProps) => {
  const trackStyle = {
    width: 6,
    transition: "opacity 200ms ease 0s",
    opacity: 0,
    bottom: 2,
    top: 2,
    borderRadius: 3,
    right: 0,
  };
  return <div style={{ ...style, ...trackStyle }} {...props} />;
};
export const kanbanRenderThumbDark = ({
  style,
  ...props
}: IRenderTracksProps) => {
  const thumbStyle = {
    borderRadius: 15,
    background: "rgba(222, 222, 222, .1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
export const kanbanRenderThumbLight = ({
  style,
  ...props
}: IRenderTracksProps) => {
  const thumbStyle = {
    borderRadius: 15,
    background: "rgba(48, 48, 48, .1)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
export const kanbanRenderView = ({ style, ...props }: IRenderTracksProps) => {
  const viewStyle: React.CSSProperties = {
    position: "relative",
    marginRight: -15,
  };
  return <div style={{ ...style, ...viewStyle }} {...props} />;
};
