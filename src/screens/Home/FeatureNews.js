import React from 'react';
import {FlatList, ImageBackground, TouchableOpacity, View} from 'react-native';
import HTML from 'react-native-render-html';
import styles from './style';
import {fonts} from '../../utils/fonts';

const tagsStyles = {
  lineHeight: 1.5,
};
const baseFontStyle = {
  color: '#041A33',
  fontFamily: fonts.PoppinsSemiBold,
  fontSize: 16,
  textAlign: 'justify',
  textAlignVertical: 'center',
  padding: 5,
};

export const FeatureNews = ({articles}) => {
  return (
    <FlatList
      data={articles}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={article => article._id}
      renderItem={({item: article}) => (
        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={{flex: 1, flexDirection: 'column'}}
            onPress={() =>
              this.props.navigation.navigate('Details', {
                rowData: article,
              })
            }>
            <ImageBackground
              source={{uri: article.lead_image_url}}
              style={styles.imageWrapper}
              imageStyle={{borderRadius: 10}}
            />
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
              {/* <TextSemiBold
                    numberOfLines={2}
                    extraStyle={styles.ListContentText}
                    Text={rowData.title.rendered}
                  /> */}
              <View style={styles.ListContentText}>
                {/* <Text>{article.title}</Text> */}
                <HTML
                  source={{html: article.title}}
                  tagsStyles={tagsStyles}
                  defaultTextProps={{allowFontScaling: true}}
                  baseFontStyle={baseFontStyle}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      style={styles.featureNewsContainer}
    />
  );
};

export default FeatureNews;
