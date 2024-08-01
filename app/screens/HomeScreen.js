import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CATEGORIES from '../config/CATEGORIES';
import COLORS from '../config/COLORS';
import SPACING from '../config/SPACING';
import ADVANTURE from '../config/ADVANTURES';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../AuthContext'

const WIDTH = Dimensions.get('screen').width;

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const { user } = useContext(AuthContext); // Get user context

  return (
    <SafeAreaView>
      <View style={{ padding: SPACING * 2 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: 'bold',
                color: COLORS.dark,
              }}
            >
              Explore & Travel With Us
            </Text>
            {user && (
              <Text
                style={{
                  fontSize: SPACING * 1.5,
                  color: COLORS.dark,
                  marginTop: SPACING / 2,
                }}
              >
                Hello, {user.displayName || 'Guest'}
              </Text>
            )}
          </View>

          <Image
            style={{
              height: SPACING * 5,
              width: SPACING * 5,
              borderRadius: SPACING * 5,
            }}
            source={require('../assets/images/Avatar.png')}
          />
        </View>

        <ScrollView style={{ marginVertical: SPACING * 2 }} horizontal>
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity
              onPress={() => setActiveCategory(index)}
              style={{ marginRight: SPACING }}
              key={category.id}
            >
              <Text
                style={[
                  { fontSize: SPACING * 2, color: COLORS.dark },
                  activeCategory === index && { color: COLORS.primary },
                ]}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={{ fontSize: SPACING * 1.7, color: COLORS.dark }}>
          {CATEGORIES[activeCategory].tours.length + ' '}
          {CATEGORIES[activeCategory].title}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={WIDTH * 0.7}
          decelerationRate="fast"
          pagingEnabled
          style={{ marginVertical: SPACING * 2 }}
        >
          {CATEGORIES[activeCategory].tours.map((tour, index) => (
            <TouchableOpacity
              style={{
                width: WIDTH * 0.7,
                height: WIDTH * 0.9,
                overflow: 'hidden',
                borderRadius: SPACING * 2,
                marginRight: SPACING * 2,
              }}
              key={index}
              onPress={() => navigation.navigate('TourDetail', { tour })}
            >
              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  height: '100%',
                  width: '100%',
                  backgroundColor: COLORS.transparent,
                  justifyContent: 'space-between',
                  padding: SPACING,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    padding: SPACING,
                    backgroundColor: COLORS.transparent,
                    borderRadius: SPACING * 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons
                    name="star-outline"
                    color={COLORS.light}
                    size={SPACING * 3}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: SPACING * 1.7,
                    color: COLORS.white,
                    fontWeight: '700',
                    marginLeft: SPACING,
                  }}
                >
                  {tour.title}
                </Text>
              </View>
              <Image
                source={tour.image}
                style={{ width: '100%', height: '100%' }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: SPACING * 2,
              fontWeight: 'bold',
            }}
          >
            Plan your Adventure with Us
          </Text>
        </View>

        <TouchableOpacity>
          <Text
            style={{
              fontSize: SPACING * 1.5,
              fontWeight: '500',
              color: COLORS.primary,
            }}
          >
            Show All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        style={{ marginVertical: SPACING * 2 }}
        showsHorizontalScrollIndicator={false}
      >
        {ADVANTURE.map((adventure) => (
          <TouchableOpacity
            key={adventure.id}
            style={{
              marginRight: SPACING * 3,
              padding: SPACING,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: SPACING * 3,
                height: SPACING * 3,
              }}
            >
              <Image
                source={adventure.image}
                resizeMode="contain"
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <Text
              style={{
                textTransform: 'capitalize',
                fontSize: SPACING,
                marginTop: SPACING,
              }}
            >
              {adventure.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
