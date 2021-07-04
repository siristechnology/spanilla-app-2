import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Image,
  Text,
  TextInput,
  Share,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native';
import {useQuery, gql} from '@apollo/client';

import styles from './style';
import container from '../../Styles/container';
import TextBold from '../../Components/TextBold/index';
import TextMedium from '../../Components/TextMedium/index';
import TimeAgo from 'react-native-timeago';
// import ListViews from '../../Components/ListView/index';
import renderIf from '../../utils/renderIf';
// import HTML from 'react-native-render-html';
import {fonts} from '../../utils/fonts';
// import BookMarkShare from '../../Components/BookMarkShare';
// import config from '../../Config/index';
import Icon from 'react-native-vector-icons/Ionicons';
// import Config from '../../Config/index';
// var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export const Home = props => {
  // this.state = {
  //   //API data store
  //   // dataSource: ds,
  //   // data: ds,
  //   isLoading: true,
  //   //search value store
  //   status: true,
  //   status2: false,
  //   text: '',
  //   url: '',
  //   image: '',
  //   refreshing: false,
  // };

  const {loading, error, refetch, data} = useQuery(FETCH_ARTICLES_QUERY, {
    variables: {},
  });

  const SearchClickStatus = () => {
    this.setState({
      status: !this.state.status,
      status2: !this.state.status2,
    });
    console.log('toggle button handler: ' + this.state.status);
    console.log('toggle button handler2: ' + this.state.status2);
  };

  useEffect(() => {
    // fetchNews();
  });

  console.log('printing loading', loading);

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

  const articles = data.fetchArticles.filter(
    article => article.source && article.source.category === 'news',
  );

  return (
    <View style={{flex: 1}}>
      {/* <Header
          //onPressSearch={() => this.props.navigation.navigate("Search")}
          onSubmitEditing={()=>this.props.navigation.navigate("SearchCategoriesList")}
        /> */}
      <View
        style={[
          styles.mainView,
          props.extraStyle,
          {marginTop: Platform.OS == 'ios' ? 20 : 0},
        ]}>
        <View style={{flex: 0.1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => SearchClickStatus()}>
            <Icon
              name="ios-search"
              color="#787D81"
              size={20}
              style={[
                {
                  marginLeft: 15,
                },
                props.iconStyle,
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.9, alignSelf: 'center', flexDirection: 'row'}}>
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
              <Text style={{color: '#4A84FC'}}>W</Text>
              <Text style={{color: '#E64D37'}}>e</Text>
              <Text style={{color: '#FAC700'}}>b</Text>
              <Text style={{color: '#508DFC'}}>i</Text>
              <Text style={{color: '#4AB24D'}}>l</Text>
              <Text style={{color: '#E64D37'}}>e</Text>
              <Text style={{color: '#606369'}}> News</Text>
            </Text>

            {/* set Title using Image icon */}
            {/* <Image style={{alignSelf:'center'}} source={require("../../image/title_home.png")} /> */}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{flex: 0.7, justifyContent: 'center', marginLeft: 8}}>
              <TextInput
                style={{fontSize: 14, color: '#787D81'}}
                onChangeText={text => this.setState({text})}
                value={'this.state.text'}
                placeholder="Type here"
                onKeyPress={console.log('Enter value' + 'this.state.text')}
                underlineColorAndroid="transparent"
                returnKeyType={'search'}
                onSubmitEditing={() =>
                  props.navigation.navigate('SearchCategoriesList', {
                    text: 'this.state.text',
                  })
                }
              />
            </View>
            <View style={{flex: 0.3, justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => SearchClickStatus()}>
                <Text
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: 15,
                    color: '#787D81',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex: 0.1}} />
        {/* {renderIf(this.state.status)(<View style={{flex: 0.1}} />)} */}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }>
        <View>
          {/* Fetch FeatureNews */}
          <View>
            <FlatList
              data={articles}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderRow={rowData => (
                <View style={styles.itemContainer}>
                  <TouchableOpacity
                    style={{flex: 1, flexDirection: 'column'}}
                    onPress={() =>
                      this.props.navigation.navigate('Details', {rowData})
                    }>
                    <ImageBackground
                      source={
                        rowData.featured_media != 0
                          ? {
                              uri: rowData._embedded['wp:featuredmedia']['0']
                                .source_url,
                            }
                          : require('../../image/img_not_found.jpg')
                      }
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
                        {/* <HTML
                          html={rowData.title.rendered}
                          tagsStyles={tagsStyles}
                          allowFontScaling
                          baseFontStyle={baseFontStyle}
                        /> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          {/* Fetch LatestNews */}
          <View style={container.marginHorizontal}>
            <TextBold extraStyle={styles.Title} Text="Latest update" />
            <View
              cornerRadius={5}
              cardElevation={2}
              cardMaxElevation={2}
              style={{marginTop: 15, marginBottom: 50}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={articles}
                renderRow={rowData => (
                  <View
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
                            rowData,
                          })
                        }>
                        {/* <ListViews
                          Categories={
                            rowData._embedded['wp:term'][0][0]['name']
                          }
                          Title={rowData.title.rendered}
                          source={
                            rowData.featured_media != 0
                              ? {
                                  uri: rowData._embedded['wp:featuredmedia'][
                                    '0'
                                  ].source_url,
                                }
                              : require('../../image/img_not_found.jpg')
                          }
                        /> */}
                      </TouchableOpacity>
                    </View>
                    <View style={{flex: 0.15}}>
                      <TouchableOpacity
                        onPress={() =>
                          Share.share(
                            {
                              message: rowData.link,
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
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
  // }
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
