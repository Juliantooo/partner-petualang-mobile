import { Dimensions, Image, StyleSheet } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

const { width, height } = Dimensions.get('window');

const images = [
    'https://images.pexels.com/photos/2468056/pexels-photo-2468056.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
]
const image = index => ({ image: images[index % images.length] });

const items = Array.from(Array(images.length)).map((_, index) => image(index));

const Banner = () => {
    return (
        <SwiperFlatList
            style={{ width, height: width * 0.5, }}
            autoplay
            autoplayDelay={5}
            index={3}
            autoplayLoop
            autoplayLoopKeepAnimation
            data={items}
            renderItem={({ item }) => <Image style={styles.image} source={{ uri: item.image }} />}
            showPagination
            pagingEnabled
            renderAll
            paginationStyleItem={{
                width: 10,
                height: 10
            }}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: width,
        resizeMode: 'cover',
    },
});

export default Banner