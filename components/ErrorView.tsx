import { Box, Button, Image, Text, VStack } from "native-base";
import React from "react";
import ErrorIllustration from "../assets/images/error-illustration.png";
import { Restart } from "fiction-expo-restart";
import { StatusBar } from "expo-status-bar";

interface IErrorViewProps {
  children: React.ReactNode | JSX.Element;
}

interface IErrorViewState {
  isError: boolean;
}

class ErrorView extends React.Component<IErrorViewProps, IErrorViewState> {
  constructor(props: IErrorViewProps) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    console.log("error", error);
    // Update state so the next render will show the fallback UI.
    this.setState({ isError: true });
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
    this.setState({ isError: true });
  }

  render(): React.ReactNode {
    if (this.state.isError) {
      // You can render any custom fallback UI
      return (
        <Box
          flex='1'
          backgroundColor='white'
          justifyContent='center'
          alignItems='center'>
          <StatusBar backgroundColor='#10b981' />
          <Image
            ml='4'
            alt='empty-cart-icon'
            source={ErrorIllustration}
            w='40'
            style={{ aspectRatio: 1 }}
          />
          <VStack space='2' flexShrink='1' my='5'>
            <Text
              textAlign='center'
              fontSize='xl'
              lineHeight='xs'
              fontWeight='bold'>
              Ooops..! Ada yang salah nih.
            </Text>
            <Text textAlign='center' fontSize='sm' lineHeight='xs'>
              Yuk, kembali ke halaman sebelumnya.
            </Text>
          </VStack>
          <Button
            onPress={() => Restart()}
            variant='solid'
            backgroundColor='tertiary.500'
            _text={{ color: "white", fontWeight: "bold" }}
            rounded='md'
            w='1/2'>
            Reload halaman
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorView;
