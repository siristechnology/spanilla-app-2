import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Text,
  Share,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import FeatureNews from './FeatureNews';
import styles from './style';
import container from '../../Styles/container';
import TextBold from '../../Components/TextBold/index';
import ListViews from '../../Components/ListView/index';
// import BookMarkShare from '../../Components/BookMarkShare';

export const Home = props => {
  const {loading, error, refetch, data} = useQuery(FETCH_ARTICLES_QUERY, {
    variables: {},
  });

  if (loading) {
    return (
      <View style={container.container}>
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      </View>
    );
  }

  const articles = data.fetchArticles.filter(
    article => article.source && article.source.category === 'news',
  );

  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={articles}
          keyExtractor={article => article._id}
          ListHeaderComponent={() => (
            <>
              <View
                style={[
                  styles.mainView,
                  {marginTop: Platform.OS == 'ios' ? 20 : 0},
                ]}>
                <View style={{flex: 0.1, justifyContent: 'center'}}></View>
                <View
                  style={{
                    flex: 0.9,
                    alignSelf: 'center',
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1}}>
                    {/* set title using Text */}
                    <Text
                      style={{
                        color: '#787D81',
                        alignSelf: 'center',
                        fontSize: 18,
                        justifyContent: 'center',
                        fontWeight: '500',
                      }}>
                      <Text style={{color: '#606369'}}> News</Text>
                    </Text>
                  </View>
                </View>
                <View style={{flex: 0.1}} />
              </View>
              <FeatureNews articles={articles} />
              <View style={container.marginHorizontal}>
                <TextBold extraStyle={styles.Title} Text="Latest update" />
              </View>
            </>
          )}
          renderItem={({item: article}) => {
            return (
              <View
                key={article._id}
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  borderBottomColor: '#E4ECF5',
                  borderBottomWidth: 0.95,
                  marginBottom: 10,
                }}>
                <View style={{flex: 0.6}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Details', {
                        rowData: article,
                      })
                    }>
                    <ListViews
                      Categories={article.title}
                      Title={article.title}
                      source={article.lead_image_url}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 0.15}}>
                  <TouchableOpacity
                    onPress={() =>
                      Share.share(
                        {
                          message: article.link,
                        },
                        {
                          dialogTitle: 'This is share dialog title',
                          excludedActivityTypes: [
                            'com.apple.UIKit.activity.PostToTwitter',
                            'com.apple.uikit.activity.mail',
                          ],
                          tintColor: 'green',
                        },
                      )
                        .then(this._showResult)
                        .catch(err => console.log(err))
                    }>
                    {/* <BookMarkShare Time={rowData.date} /> */}
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          style={{
            marginLeft: 15,
            marginRight: 15,
          }}
        />
      </View>
    </View>
  );
};

export const FETCH_ARTICLES_QUERY = gql`
  query fetchArticles {
    fetchArticles {
      _id
      title
      url
      lead_image_url
      excerpt
      original_content
      translated_content
      source {
        name
        logoLink
        category
      }
      author
      date_published
      date_modified
      likes
    }
  }
`;

export default Home;
