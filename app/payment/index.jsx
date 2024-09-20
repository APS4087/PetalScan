import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import images from '../../components/data';


const { width, height } = Dimensions.get('window');

export default function PremiumFeatureScreen() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      console.log('Selected Plan:', selectedPlan);
      // Add further navigation or actions here
    } else {
      console.log('Please select a plan.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require('../../assets/images/parkImage.jpg')} style={styles.backgroundImage} />

      {/* Premium Feature Content */}
      <View style={styles.contentContainer}>
        {/* Back button */}
      <TouchableOpacity style={styles.logo} onPress={() => router.push('/home')}>
        <Image source={images.backArrowIcon} style={styles.arrow} />
      </TouchableOpacity>

        <Text style={styles.title}>PetalScan</Text>
        <Text style={styles.subtitle}>
          Unlock all the power of this mobile tool and enjoy digital experience like never before!
        </Text>

        <View style={styles.benefitContainer}>
          <Text style={styles.benefit}>No advertisements</Text>
          <Text style={styles.benefit}>Unlimited snaps</Text>
          <Text style={styles.benefit}>Singapore botanic garden's database</Text>
        </View>

        <View style={styles.planContainer}>
          <TouchableOpacity
            style={[styles.plan, selectedPlan === 'Monthly' && styles.selectedPlan]}
            onPress={() => handlePlanSelection('Monthly')}
          >
            <Text style={styles.planType}>Monthly</Text>
            <Text style={styles.planPrice}>$4.99/month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.plan, selectedPlan === '20 snaps' && styles.selectedPlan]}
            onPress={() => handlePlanSelection('20 snaps')}
          >
            <Text style={styles.planType}>20 snaps</Text>
            <Text style={styles.planPrice}>$2.00</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.plan, selectedPlan === '10 snaps' && styles.selectedPlan]}
            onPress={() => handlePlanSelection('10 snaps')}
          >
            <Text style={styles.planType}>10 snaps</Text>
            <Text style={styles.planPrice}>$1.50</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.cancelText}>Cancel Anytime</Text>

        <TouchableOpacity
          style={[styles.continueButton, !selectedPlan && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedPlan}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By placing this order, you agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>. 
          Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  logo: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.03,
  },
  arrow: {
    width: width * 0.07,
    height: width * 0.07,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 0,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 80,
    color: '#0D368C',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#092765',
  },
  benefitContainer: {
    width: '100%',
    alignItems: 'flex-start',  // Align benefits to the left
    marginBottom: 20,
  },
  benefit: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
    color: '#000000',
    fontWeight: 'bold',  // Benefits are now bold
  },
  planContainer: {
    width: '90%',
    marginBottom: 20,
    marginTop: 0,
  },
  plan: {
    borderWidth: 1,
    borderColor: '#092765',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',  // Align items in a row (Plan type on left, price on right)
    justifyContent: 'space-between',  // Distribute space between Plan type and price
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  selectedPlan: {
    backgroundColor: '#d3e4f2',
  },
  planType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D368C',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',  // Plan price is now bold
    color: '#0D368C',
  },
  cancelText: {
    fontSize: 14,
    color: '#8391A1',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 110,
    borderRadius: 14,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#888',  // Disabled color
  },
  continueButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
  },
  linkText: {
    color: '#1A73E8',
  },
});
