import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import TimeAgo from 'react-native-timeago';
import Icon from 'react-native-vector-icons/Ionicons';
import TextMedium from '../../Components/TextMedium/index';
import moment from 'moment';

const BookMarkShare = ({Time}) => (
  <View>
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
      }}>
      <View style={{flex: 0.85}}>
        <TextMedium
          extraStyle={{
            color: '#8D96A3',
            fontSize: 10,
            //justifyContent: "flex-end",
            // textTransform: "capitalize"
          }}
          Text={<TimeAgo time={moment.unix(Time / 1000)} />}
        />
      </View>
      <View style={{flex: 0.15, flexDirection: 'row'}}>
        <View style={{flex: 0.5}}>
          {/* <TouchableOpacity onPress={this.props.onPressBookmark}>
                <Icon
                  name="md-bookmark"
                  size={18}
                  style={{
                    color: "#808080",
                    marginLeft: 5,
                    alignSelf: "flex-end"
                  }}
                />
                </TouchableOpacity> */}
        </View>
        <View style={{flex: 0.5, justifyContent: 'center'}}>
          <Icon
            name="ios-share-social"
            size={18}
            style={{
              color: '#808080',
              marginRight: 5,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </View>
    </View>
  </View>
);

export default BookMarkShare;
