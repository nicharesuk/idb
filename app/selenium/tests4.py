# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class Tests4(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://weebmd.me/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_s4(self):
        driver = self.driver
        driver.get(self.base_url + "/characters")
        self.assertEqual("http://localhost:3000/characters", driver.current_url)
        driver.find_element_by_xpath("//img[contains(@src,'https://myanimelist.cdn-dena.com/images/characters/5/54265.jpg')]").click()
        self.assertRegexpMatches(driver.current_url, r"^http://localhost:3000/characters[\s\S]type=characters&id=1151$")
        driver.find_element_by_xpath("//div[2]/div/div/i").click()
        self.assertEqual("http://localhost:3000/characters", driver.current_url)
        driver.find_element_by_xpath("//div[@id='root']/div/div/div[2]/div/div[67]/div/button[3]").click()
        self.assertRegexpMatches(driver.current_url, r"^http://localhost:3000/characters[\s\S]page=3$")
        driver.find_element_by_xpath("//img[contains(@src,'https://myanimelist.cdn-dena.com/images/characters/10/161005.jpg')]").click()
        self.assertRegexpMatches(driver.current_url, r"^http://localhost:3000/characters[\s\S]page=3&type=characters&id=1426$")
        driver.find_element_by_xpath("//div[2]/div/div/i").click()
        self.assertRegexpMatches(driver.current_url, r"^http://localhost:3000/characters[\s\S]page=3$")
        driver.close()
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
