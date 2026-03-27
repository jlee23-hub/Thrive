import { token } from "@atlaskit/tokens";
import { Text } from "@atlaskit/primitives";
import Heading from "@atlaskit/heading";
import ErrorIcon from "@atlaskit/icon/core/error";

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: token("elevation.surface.sunken"),
    }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        margin: `0 ${token("space.200")}`,
        backgroundColor: token("elevation.surface"),
        borderRadius: '6px',
        padding: token("space.300"),
        border: `1px solid ${token("color.border")}`,
      }}>
        <div style={{
          display: 'flex',
          marginBottom: token("space.200"),
          gap: token("space.100"),
          alignItems: 'center',
        }}>
          <ErrorIcon label="Error" color={token("color.icon.danger")} />
          <Heading size="medium">404 Page Not Found</Heading>
        </div>

        <Text color="color.text.subtlest">
          Did you forget to add the page to the router?
        </Text>
      </div>
    </div>
  );
}
