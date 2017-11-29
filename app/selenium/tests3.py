# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class Tests3(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://weebmd.me/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_s3(self):
        driver = self.driver
        driver.get(self.base_url + "/characters")
        self.assertEqual("http://weebmd.me/characters", driver.current_url)
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//img[contains(@src,'https://myanimelist.cdn-dena.com/images/characters/5/54265.jpg')]"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//img[contains(@src,'https://myanimelist.cdn-dena.com/images/characters/5/54265.jpg')]").click()
        self.assertRegexpMatches(driver.current_url, r"^http://weebmd\.me/characters[\s\S]type=characters&id=1151$")
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//div[3]/div/div[2]/div[1]/div"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//div[3]/div/div[2]/div[1]/div").click()
        self.assertRegexpMatches(driver.current_url, r"^http://weebmd\.me/characters[\s\S]type=actors&id=393$")
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//div[3]/div/div[2]/div[1]/div"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//div[3]/div/div[2]/div[1]/div").click()
        self.assertRegexpMatches(driver.current_url, r"^http://weebmd\.me/characters[\s\S]type=characters&id=1151$")
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//div[2]/div[2]/div[2]/div"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//div[2]/div[2]/div[2]/div").click()
        self.assertRegexpMatches(driver.current_url, r"^http://weebmd\.me/characters[\s\S]type=animes&id=266$")
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//div[3]/div/div[2]/div[1]/div"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//div[3]/div/div[2]/div[1]/div").click()
        self.assertRegexpMatches(driver.current_url, r"^http://weebmd\.me/characters[\s\S]type=characters&id=1151$")
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//div[3]/div[3]/div[2]/div/div"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//div[3]/div[3]/div[2]/div/div").click()
        self.assertRegexpMatches(driver.current_url, r"^http://weebmd\.me/characters[\s\S]type=mangas&id=165$")
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//div[3]/div/div[2]/div[1]/div"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//div[3]/div/div[2]/div[1]/div").click()
        self.assertRegexpMatches(driver.current_url, r"^http://weebmd\.me/characters[\s\S]type=characters&id=1151$")
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//div[2]/div/div/i"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//div[2]/div/div/i").click()
        self.assertEqual("http://weebmd.me/characters", driver.current_url)
        driver.get(self.base_url + "/characters?page=29")
        self.assertRegexpMatches(driver.current_url, r"^http://weebmd\.me/characters[\s\S]page=29$")
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//img[contains(@src,'https://myanimelist.cdn-dena.com/images/characters/12/259387.jpg')]"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//img[contains(@src,'https://myanimelist.cdn-dena.com/images/characters/12/259387.jpg')]").click()
        self.assertRegexpMatches(driver.current_url, r"^http://weebmd\.me/characters[\s\S]page=29&type=characters&id=931$")
        for i in range(60):
            try:
                if self.is_element_present(By.XPATH, "//div[2]/div/div/i"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        driver.find_element_by_xpath("//div[2]/div/div/i").click()
        self.assertRegexpMatches(driver.current_url, r"^http://weebmd\.me/characters[\s\S]page=29$")
    
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
